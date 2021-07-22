import { resolve } from 'path'

export const paths = {
    repo: resolve(__dirname, '../repo'),
    builds: resolve(__dirname, '../builds'),
    client: resolve(__dirname, '../../client', 'build'),
    indexHtml: resolve(__dirname, '../../client', 'build', 'index.html'),
    testRepo: resolve(__dirname, '__tests__', 'repo'),
    testBuilds: resolve(__dirname, '__tests__', 'builds'),
    desktopTests: resolve(__dirname, '__tests__', 'desktop')
}

export const port = 8080