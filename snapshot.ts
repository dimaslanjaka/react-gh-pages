//import { ServerSnapshot } from 'react-prerender-it'
import { ServerSnapshot } from '../src/index'
ServerSnapshot({ source: 'build', destDir: 'tmp', registerStatic: [] })