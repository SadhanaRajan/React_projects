import { format } from 'date-fns';
import { Columnfilter } from '../components/ReactTable/ColumnFilter';

export const COLUMNS = [
	{
		Header: 'ID',
		Footer: 'ID',
		accessor: 'id',
		disableFilters: true
	},
	{
		Header: 'First Name',
		Footer: 'First Name',
		accessor: 'first_name',
	},
	{
		Header: 'Last Name',
		Footer: 'Last Name',
		accessor: 'last_name',
	},
	{
		Header: 'Date of Birth',
		Footer: 'Date of Birth',
		accessor: 'date_of_birth',
		Cell: ( { value } ) => { return format( new Date( value ), 'dd/MM/yyyy' ) },
		disableFilters: true
	},
	{
		Header: 'Country',
		Footer: 'Country',
		accessor: 'country',
	},
	{
		Header: 'Phone Number',
		Footer: 'Phone Number',
		accessor: 'phone',
		disableFilters: true
	}
];

export const GROUPED_COLUMNS = [
	{
		Header: 'ID',
		Footer: 'ID',
		accessor: 'id'
	},
	{
		Header: 'Name',
		Footer: 'Name',
		columns: [
			{
				Header: 'First Name',
				Footer: 'First Name',
				accessor: 'first_name'
			},
			{
				Header: 'Last Name',
				Footer: 'Last Name',
				accessor: 'last_name'
			}
		]
	},
	{
		Header: 'Info',
		Footer: 'Info',
		columns: [
			{
				Header: 'Date of Birth',
				Footer: 'Date of Birth',
				accessor: 'date_of_birth'
			},
			{
				Header: 'Country',
				Footer: 'Country',
				accessor: 'country'
			},
			{
				Header: 'Phone Number',
				Footer: 'Phone Number',
				accessor: 'phone'
			}
		]
	}
]