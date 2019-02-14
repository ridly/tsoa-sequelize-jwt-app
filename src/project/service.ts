import { Project } from './model';

class Service {

    public async getProject(id: number): Promise< Project | null > {
        return Project.findOne({ where: { id } });
    }

}

export const ProjectService = new Service();
