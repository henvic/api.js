import Filter from './Filter';
import Geo from './Geo';
import Query from './Query';
import Range from './Range';

if (typeof window !== 'undefined') {
	window.Filter = Filter;
	window.Geo = Geo;
	window.Query = Query;
	window.Range = Range;
}
