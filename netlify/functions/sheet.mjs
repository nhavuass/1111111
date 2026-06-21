const SHEET_ID = '1mj-dSVUGGdC8EdrnV0ALFxJtZOq5XQk1CE1cKSeVvvk';
const SHEET_URL =
	'https://script.google.com/macros/s/AKfycbxL_vm_l2mW55MACqGTQn6gWXzv5sH0iIko7hQ3SJLc2ZjMqA3IZM8JdywwG2WpathT/exec';

export default async (req) => {
	try {
		const body = req.method === 'POST' ? await req.json() : {};
		const { action = 'append', value, row } = body;
		if (!value) return Response.json(null, { status: 400 });

		const params = new URLSearchParams({
			sheetId: SHEET_ID,
			action,
			value: JSON.stringify(value),
		});
		if (row) params.append('row', row);

		const res = await fetch(`${SHEET_URL}?${params}`);
		const data = await res.json();
		return Response.json(data);
	} catch {
		return Response.json({ error: 'lỗi proxy' }, { status: 500 });
	}
};

export const config = {
	path: '/api/sheet',
};
