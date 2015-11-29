'use strict';

import io from 'socket.io-client';
import TransportFactory from '../../api/TransportFactory';
import NodeTransport from '../../api/node/NodeTransport';
import Filter from '../../api-query/Filter';
import Geo from '../../api-query/Geo';
import Query from '../../api-query/Query';
import Range from '../../api-query/Range';
import Launchpad from '../../api/Launchpad';

TransportFactory[TransportFactory.DEFAULT_TRANSPORT_NAME] = NodeTransport;
Launchpad.socket(io);

export { Launchpad, Filter, Geo, Query, Range };
