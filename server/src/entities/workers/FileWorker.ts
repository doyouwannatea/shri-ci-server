import { rmdir, mkdir, access } from 'fs/promises'

export default class FileWorker {
    async recreateDir(path: string): Promise<void> {
        try {
            await rmdir(path, { recursive: true })
            await mkdir(path)
        } catch (error) {
            console.error(error)
        }
    }

    async createDirIfNotExists(path: string): Promise<void> {
        if (!(await this.exists(path))) {
            await mkdir(path)
        }
    }

    async exists(path: string): Promise<boolean> {
        try {
            await access(path)
            return true
        } catch (error) {
            return false
        }
    }

    async rmdir(path: string): Promise<void> {
        await rmdir(path, { recursive: true })
    }
}