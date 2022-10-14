//import { ServerSnapshot } from 'react-prerender-it'
const { ServerSnapshot } = require('../')
ServerSnapshot({ source: 'build', destDir: 'tmp', registerStatic: [] })