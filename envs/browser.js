'use strict';

import AjaxTransport from '../src/api/AjaxTransport';
import Filter from '../src/api-query/Filter';
import Geo from '../src/api-query/Geo';
import Launchpad from '../src/api/Launchpad';
import Query from '../src/api-query/Query';
import Range from '../src/api-query/Range';
import TransportFactory from '../src/api/TransportFactory';

TransportFactory[TransportFactory.DEFAULT_TRANSPORT_NAME] = AjaxTransport;
Launchpad.socket(window.io);

window.Filter = Filter;
window.Geo = Geo;
window.Query = Query;
window.Range = Range;
window.Launchpad = Launchpad;
