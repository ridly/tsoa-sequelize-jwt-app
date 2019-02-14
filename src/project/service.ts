import { Project } from './model';

export class Service {

    public async getProject(id: number): Promise< Project | null > {
        return Project.findOne({ where: { id } });
    }

}

export const ProjectService = new Service();
