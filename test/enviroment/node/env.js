'use strict';

import assert from 'assert';
import NodeRequestMock from '../../fixtures/node/NodeRequestMock';
import RequestMock from '../../fixtures/RequestMock';

RequestMock.set(NodeRequestMock);

global.assert = assert;
