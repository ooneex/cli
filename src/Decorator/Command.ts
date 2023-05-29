import {
  Collection,
  getOrNull,
  Helper,
  registerConstant,
  z,
} from "../../deps.ts";
import { CommandDefinitionException } from "../CommandDefinitionException.ts";
import { CommandException } from "../CommandException.ts";
import { Keys } from "../Keys.ts";
import { Response } from "../Response.ts";
import { CommandDefinitionSchema } from "../schema.ts";
import { CommandDefinitionType, MethodDecoratorReturnType } from "../types.ts";

export const Command = (
  name: z.infer<typeof CommandDefinitionSchema.shape.name>,
  actions: z.infer<typeof CommandDefinitionSchema.shape.actions>,
  config: Omit<
    CommandDefinitionType,
    "name" | "actions" | "run"
  >,
): MethodDecoratorReturnType => {
  if (!name) {
    throw new CommandException(`Cannot register command. Name is required`);
  }

  return (
    // deno-lint-ignore ban-types
    target: Object,
    propertyName: string,
    // deno-lint-ignore no-explicit-any
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    if (!target || !propertyName || !Helper.isObject(descriptor)) {
      throw new CommandException(
        `Cannot register command. Available only for class method`,
      );
    }

    const method = descriptor.value!;

    descriptor.value = function Controller(): Response {
      let parameters = Reflect.getOwnMetadata(
        Keys.Internal.Parameters,
        target,
        propertyName,
      ) ?? [];

      parameters = parameters.map((parameter: unknown) => {
        if (typeof parameter === "function") {
          return parameter.apply(target);
        }

        return parameter;
      });

      return method.apply(this, parameters);
    };

    let commands = getOrNull<Collection<string, CommandDefinitionType>>(
      Keys.Commands,
    );

    if (!commands) {
      commands = new Collection<string, CommandDefinitionType>();
      registerConstant(Keys.Commands, commands);
    }

    if (commands.has(name)) {
      throw new CommandException(
        `Cannot register command. Name "${name}" already exists`,
      );
    }

    const commandDef: CommandDefinitionType = {
      name,
      actions,
      run: descriptor.value,
      ...config,
    };

    const result = CommandDefinitionSchema.safeParse(commandDef);

    if (!result.success) {
      const error = result.error.issues[0];

      throw new CommandDefinitionException(
        `${error.path.join(".")}: ${error.message}`,
        null,
        { name, actions, ...config },
      );
    }

    commands.add(name, commandDef);
  };
};
