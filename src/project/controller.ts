import {Get, Tags, Route, Controller, Security, Response, SuccessResponse } from 'tsoa';
import { ProjectService } from './service';
import { Project } from './model';

@Route('project')
@Tags('Project')
export class ProjectController extends Controller {
    @Security('jwt', ['project:read'])
    @Response('401', 'Unathorized')
    @SuccessResponse('200', 'OK')
    @Get('{id}')
    @Tags('Get')
    public async getProject(id: number): Promise< Project | null > {
        return ProjectService.getProject(id);
    }
}
