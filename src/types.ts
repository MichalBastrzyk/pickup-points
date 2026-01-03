const ALL_SERVICES = [
	"inpost",
	"ruch",
	"orlen",
	"poczta",
	"ups",
	"dhl",
	"dpd",
	"meest",
	"fedex",
	"furgonetkaPunkt",
] as const;

export async function getAllPointsForAddress(
	address: string,
	filters?: Filters,
) {
	const body: RequestBody = {
		location: {
			search_phrase: address,
		},
		filters: filters || {
			services: ALL_SERVICES,
		},
	};

	const res = await fetch(
		`${import.meta.env.VITE_FURGNOTEKA_API_URL}/points/map`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		},
	);

	if (!res.ok) {
		throw new Error("Failed to fetch points");
	}

	const data = await res.json();
	return data;
}

export interface RequestBody {
	location: Location;
	filters: Filters;
}

export interface Filters {
	services: typeof ALL_SERVICES;
	point_types?:
		| "cod_only"
		| "no_orlen"
		| "all_points"
		| "send_points"
		| "delivery_points"
		| "no_dpd_pickup_station"
		| "no_dhl_parcelstation"
		| "no_dhl_cainiao"
		| "dhl_pop"
		| "digital_label"
		| "food"
		| "no_happy_pack"
		| "no_pudo_partners"[]
		| undefined;
	map_bounds?:
		| {
				north_west?: Coordinates;
				north_east?: Coordinates;
				south_west?: Coordinates;
				south_east?: Coordinates;
		  }
		| undefined;
	type?: "parcel_machine" | "service_point";
	country_codes?: string[];
	point_id?: string;
}

export interface Coordinates {
	latitude: number;
	longitude: number;
}

export interface Location {
	coordinates?: Coordinates;
	search_phrase?: string;
	address?: {
		postcode?: string;
		street?: string;
		city?: string;
		country_code?: string;
		province?: string;
		house_number?: string;
	};
	points_max_distance?: number;
}
