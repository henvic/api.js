'use strict';

import assert from 'assert';
import NodeRequestMock from '../test/fixtures/NodeRequestMock';
import RequestMock from '../test/fixtures/RequestMock';

RequestMock.set(NodeRequestMock);

global.assert = assert;
