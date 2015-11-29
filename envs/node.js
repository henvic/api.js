'use strict';

import request from 'request';
import io from 'socket.io-client';
import TransportFactory from '../src/api/TransportFactory';
import NodeTransport from '../src/api/NodeTransport';
import Filter from '../src/api-query/Filter';
import Geo from '../src/api-query/Geo';
import Query from '../src/api-query/Query';
import Range from '../src/api-query/Range';
import Launchpad from '../src/api/Launchpad';

NodeTransport.Adapter = request;
TransportFactory[TransportFactory.DEFAULT_TRANSPORT_NAME] = NodeTransport;
Launchpad.socket(io);

export {Launchpad, Filter, Geo, Query, Range};
