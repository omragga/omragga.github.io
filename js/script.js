'use strict';

import {makeSpace} from './space.js';
import {play} from './play.js';
import {aboutAddObserver} from './about.js';
import {initControls} from './controls.js';
import {controlVh} from './viewport-height.js';

controlVh();
play();
makeSpace();
aboutAddObserver();
initControls();