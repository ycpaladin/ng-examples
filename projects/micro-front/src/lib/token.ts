import { InjectionToken } from "@angular/core";
import { PlanetApplication } from "./planet.class";

export const PLANET_APPLICATIONS = new InjectionToken<PlanetApplication>('PLANET_APPLICATIONS');
