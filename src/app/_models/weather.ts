export class Information {
    informationId!: number;
    temperature!: string;
    wind!: string;
    humidity!: string;
    pressure!: string;
};

export class Locality {
    name!: number;
    url_weather_forecast_15_days!: string;
    url_hourly_forecast!: string;
    country!: string;
    url_country!: string;

};

export class Day {
    dayId!: string;
    name!: string;
    date!: string;
    temperature_max!: number;
    temperature_min!: number;
    icon!: string;
    text!: string;
    humidity!: number;
    wind!: number;
    wind_direction!: string;
    icon_wind!: string;
    sunrise!: string;
    sunset!: string;
    moonrise!: string;
    moonset!: string;
    moon_phases_icon!: string;
    weatherId!: number;
};

export class Hour {
    hourId!: number;
    name!: string;
    date!: string;
    hour_data!: string;
    temperature!: number;
    text!: string;
    humidity!: number;
    pressure!: number;
    icon!: string;
    wind!: number;
    wind_direction!: string;
    icon_wind!: string;
    weatherId!: number;
};

export class Weather {
    weatherId!: number;
    copyright!: string;
    use!: string;
    informationId!: number;
    information!: Information;
    web!: string;
    language!: string;
    localityId!: Locality;
    days!: Day[];
    hours!: Hour[];
    active!: boolean;
}
