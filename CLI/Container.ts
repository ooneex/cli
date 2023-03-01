import { HandlerCommand } from "./Command/Handler/HandlerCommand.ts";
import { HelpCommand } from "./Command/Help/HelpCommand.ts";
import { MiddlewareCommand } from "./Command/Middleware/MiddlewareCommand.ts";
import { NewCommand } from "./Command/Project/NewCommand.ts";
import { ProjectCommand } from "./Command/Project/ProjectCommand.ts";
import { RouteCommand } from "./Command/Route/RouteCommand.ts";
import { VersionCommand } from "./Command/Version/VersionCommand.ts";
import { ViewCommand } from "./Command/View/ViewCommand.ts";
import { Collection } from "./deps.ts";
import { ICommand } from "./types.ts";

export class Container extends Collection<string, ICommand> {
}

export const container = new Container();

const version = new VersionCommand();
container.add(version.getName(), version);

const help = new HelpCommand();
container.add(help.getName(), help);

const view = new ViewCommand();
container.add(view.getName(), view);

const handler = new HandlerCommand();
container.add(handler.getName(), handler);

const middleware = new MiddlewareCommand();
container.add(middleware.getName(), middleware);

const route = new RouteCommand();
container.add(route.getName(), route);

const project = new ProjectCommand();
container.add(project.getName(), project);

const newProject = new NewCommand();
container.add(newProject.getName(), newProject);
