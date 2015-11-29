'use strict';

import TransportFactory from '../src/api/TransportFactory';
import AjaxTransport from '../src/api/AjaxTransport';
import Filter from '../src/api-query/Filter';
import Geo from '../src/api-query/Geo';
import Query from '../src/api-query/Query';
import Range from '../src/api-query/Range';
import Launchpad from '../src/api/Launchpad';

TransportFactory[TransportFactory.DEFAULT_TRANSPORT_NAME] = AjaxTransport;

if (typeof window !== 'undefined') {
	window.Filter = Filter;
	window.Geo = Geo;
	window.Query = Query;
	window.Range = Range;
	window.Launchpad = Launchpad;
	Launchpad.io = window.io;
}

