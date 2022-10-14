//import { ServerSnapshot } from 'react-prerender-it'
const { join } = require('path')
const { ServerSnapshot } = require('../')
ServerSnapshot({ source: join(__dirname, 'build'), dest: join(__dirname, 'tmp'), registerStatic: [] })