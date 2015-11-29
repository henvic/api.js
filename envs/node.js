'use strict';

import TransportFactory from '../src/api/TransportFactory';
import NodeTransport from '../src/api/NodeTransport';
import Launchpad from '../src/api/Launchpad';

var request = require('request');
var io = require('socket.io-client');

NodeTransport.Adapter = request;

TransportFactory[TransportFactory.DEFAULT_TRANSPORT_NAME] = NodeTransport;

Launchpad.io = io;
