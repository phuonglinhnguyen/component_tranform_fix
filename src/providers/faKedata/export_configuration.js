export const getDataExport = () => {
	return [
		{
			name: 'EXPORT_0',
			cron_trigger: '0/10 * * * * ?',
			export_destination: '/mnt/x-storage/Projects_SIT/089_190611_002_505657/Export',
			active: false,
			project_id: '5d099a031927c3001465f932',
			collect_export_option: {
				type: 'DOC'
			},
			export_format: [
				{
					type: 'csv',
					fields_export: [
						{
							name: 'Capture Date',
							value: 'Capture Date'
						},
						{
							name: 'Merchant Name',
							value: 'Merchant Name'
						},
						{
							name: 'Txn Amount',
							value: 'Txn Amount'
						},
						{
							name: 'Txn Currency',
							value: 'Txn Currency'
						},
						{
							name: 'Foreign Txn Amount',
							value: 'Foreign Txn Amount'
						},
						{
							name: 'Rechnung Nr.',
							value: 'Rechnung Nr'
						},
						{
							name: 'Ust-Identnummer des Merchants',
							value: 'Ust_Identnummer des Merchants'
						},
						{
							name: 'Umsatzsteuersatz 1',
							value: 'Umsatzsteuersatz 1'
						},
						{
							name: 'Umsatzsteuersatz 2',
							value: 'Umsatzsteuersatz 2'
						},
						{
							name: 'Leistungsbezeichnung 1',
							value: 'Leistungsbezeichnung 1'
						},
						{
							name: 'Netto Betrag pro Umsatzsteuersatz 1',
							value: 'Netto Betrag pro Umsatzsteuersatz 1'
						},
						{
							name: 'Currency',
							value: 'Currency'
						},
						{
							name: 'Leistungsbezeichnung 2',
							value: 'Leistungsbezeichnung 2'
						},
						{
							name: 'Card Last 4 Digits',
							value: 'Card Last 4 Digits'
						},
						{
							name: 'Category',
							value: 'Category'
						},
						{
							name: 'Receipt Name',
							value: 'Receipt Name'
						}
					],
					fileName: 'Merchant Name',
					delimiter: ';'
				}
			]
		}
	];
};
