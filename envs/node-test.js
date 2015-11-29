'use strict';

import assert from 'assert';
import nock from 'nock';
import url from 'url';
import NodeRequestMock from '../test/fixtures/NodeRequestMock';
import RequestMock from '../test/fixtures/RequestMock';

NodeRequestMock.inject('url', url);
NodeRequestMock.inject('nock', nock);
RequestMock.set(NodeRequestMock);

global.assert = assert;
