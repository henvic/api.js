'use strict';

import url from 'url';
import assert from 'assert';
import nock from 'nock';
import RequestMock from '../test/RequestMock';
import NodeRequestMock from '../test/fixtures/NodeRequestMock';

NodeRequestMock.inject('url', url);
NodeRequestMock.inject('nock', nock);
RequestMock.set(NodeRequestMock);

global.assert = assert;
