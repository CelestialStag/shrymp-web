export interface Domain {
	id: number;
	domain: string;
	create_date: Date;
}

export interface Link {
	domain?: string;
	long_url: string;
	tiny_url: string;
	create_date: Date;
}