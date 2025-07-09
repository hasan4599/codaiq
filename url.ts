import os from 'os';

const platform = os.platform();

const server = platform === 'win32'
    ? 'http://localhost:3000'
    : 'https://codaiq.com';

const project = '/var/www/projects';

export { server, project };
