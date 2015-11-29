'use strict';

import AjaxTransport from '../../api/browser/AjaxTransport';
import Filter from '../../api-query/Filter';
import Geo from '../../api-query/Geo';
import Launchpad from '../../api/Launchpad';
import Query from '../../api-query/Query';
import Range from '../../api-query/Range';
import TransportFactory from '../../api/TransportFactory';

TransportFactory[TransportFactory.DEFAULT_TRANSPORT_NAME] = AjaxTransport;
Launchpad.socket(window.io);

window.Filter = Filter;
window.Geo = Geo;
window.Query = Query;
window.Range = Range;
window.Launchpad = Launchpad;
