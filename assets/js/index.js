const ApdUrl =
  "https://science.nasa.gov/wp-json/wp/v2/apod-basic/?api_key=pbCkb7GgCtG76qCMmJQcLfKPnLfzqCJbKwMGWRdM";
const aploadDateIn = document.getElementById("apod-date-input");
const selectedDate = aploadDateIn.nextElementSibling;
const aploadDate = document.getElementById("apod-date");
const aploadImg = document.getElementById("apod-image");
const aploadTitle = document.getElementById("apod-title");
const aploadDateDet = document.getElementById("apod-date-detail");
const aploadExp = document.getElementById("apod-explanation");
const aploadDateInfo = document.getElementById("apod-date-info"); //same as details
const aploadMediaTyp = document.getElementById("apod-media-type");

async function getApiData(apiUrl) {
  const res = await fetch(apiUrl);
  const data = await res.json();
  return data;
}

async function renderApdData() {
  const data = await getApiData(ApdUrl);

  const apod = data[0];
  const { date, explanation, media_type, title, hdurl } = apod;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  aploadDate.innerHTML = `Astronomy Picture of the Day - ${formattedDate}`;

  selectedDate.innerHTML = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  aploadDateDet.innerHTML = date;
  aploadDateInfo.innerHTML = date;
  aploadImg.setAttribute("src", hdurl);
  aploadExp.innerHTML = explanation;
  aploadTitle.innerHTML = title;
  aploadMediaTyp.innerHTML = media_type;
}

aploadDateIn.addEventListener("change", function () {
  let date = new Date(aploadDateIn.value);

  selectedDate.innerHTML = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
});

const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function (e) {
    e.preventDefault();

    let sectionId = navLinks[i].getAttribute("data-section");

    for (let j = 0; j < sections.length; j++) {
      sections[j].classList.add("hidden");
      navLinks[j].classList.remove("bg-blue-500/10", "text-blue-400");

      navLinks[j].classList.add("text-slate-300");
    }

    let selectedSection = document.getElementById(sectionId);
    selectedSection.classList.remove("hidden");

    navLinks[i].classList.add("bg-blue-500/10", "text-blue-400");

    navLinks[i].classList.remove("text-slate-300");
  });
}

const launchesUrl =
  "https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10";
const featuredLaunch = document.getElementById("featured-launch");
const launchesGrid = document.getElementById("launches-grid");

async function renderLaunches() {
  const data = await getApiData(launchesUrl);
  launches = data.results;

  addFeaturedLaunch(launches[0]);
  displayGridLaunches(launches);
}
function addFeaturedLaunch(launch) {
  const {
    name,
    net,
    status,
    image,
    launch_service_provider,
    rocket,
    mission,
    pad,
  } = launch;

  const launchDate = new Date(net);

  const formattedDate = launchDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  const formattedTime = launchDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });

  const today = new Date();
  const daysUntilLaunch = Math.ceil(
    (launchDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  let box = `
     <div
              class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all"
            >
              <div
                class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
              <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
                <div class="flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-3 mb-4">
                      <span
                        class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2"
                      >
                        <i class="fas fa-star"></i>
                        Featured Launch
                      </span>
                      <span
                        class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold"
                      >
                                                ${status.abbrev}

                      </span>
                    </div>
                    <h3 class="text-3xl font-bold mb-3 leading-tight">
                                              ${name}

                    </h3>
                    <div
                      class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400"
                    >
                      <div class="flex items-center gap-2">
                        <i class="fas fa-building"></i>
                        <span>${launch_service_provider.name}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-rocket"></i>
                        <span>${rocket.configuration.name}</span>
                      </div>
                    </div>
                    <div
                      class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6"
                    >
                      <i class="fas fa-clock text-2xl text-blue-400"></i>
                      <div>
                        <p class="text-2xl font-bold text-blue-400">${daysUntilLaunch}</p>
                        <p class="text-xs text-slate-400">Days Until Launch</p>
                      </div>
                    </div>
                    <div class="grid xl:grid-cols-2 gap-4 mb-6">
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-calendar"></i>
                          Launch Date
                        </p>
                        <p class="font-semibold">${formattedDate}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-clock"></i>
                          Launch Time
                        </p>
                        <p class="font-semibold">${formattedTime + " UTC"}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-map-marker-alt"></i>
                          Location
                        </p>
                        <p class="font-semibold text-sm">${pad.location.name}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-globe"></i>
                          Country
                        </p>
                        <p class="font-semibold">${pad.country.name}</p>
                      </div>
                    </div>
                    <p class="text-slate-300 leading-relaxed mb-6">
                    ${mission.description}
                    </p>
                  </div>
                  <div class="flex flex-col md:flex-row gap-3">
                    <button
                      class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <i class="fas fa-info-circle"></i>
                      View Full Details
                    </button>
                    <div class="icons self-end md:self-center">
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="far fa-heart"></i>
                      </button>
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="fas fa-bell"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="relative">
                  <div
                    class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50"
                  >
                    <!-- Placeholder image/icon since we can't load external images reliably without correct URLs -->
                    <div
                      class="flex items-center justify-center h-full min-h-[400px] bg-slate-800"
                    >
                      <img
                 
                  class="w-full h-full object-cover"
                  src=${image.image_url}
                />
                    </div>
                    <div
                      class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"
                    ></div>
                  </div>
                </div>
              </div>
            </div>`;
  featuredLaunch.innerHTML = box;
}
function displayGridLaunches(launch) {
  let box = "";
  for (let i = 1; i < launch.length; i++) {
    let currentLaunch = launch[i];
    let {
      name,
      net,
      status,
      image,
      launch_service_provider,
      rocket,
      mission,
      pad,
    } = currentLaunch;

    let launchDate = new Date(net);

    let formattedDate = launchDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });

    // Launch Time
    let formattedTime = launchDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });
    box += `
   <div
              class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
            >
              <div
                class="relative h-48 bg-slate-900/50 flex items-center justify-center"
              >
               <img
                 
                  class="w-full h-full object-cover"
                  src=${image.image_url}
                />
                <div class="absolute top-3 right-3">
                  <span
                    class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                  >
                    ${status.abbrev}
                  </span>
                </div>
              </div>
              <div class="p-5">
                <div class="mb-3">
                  <h4
                    class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                  >
                    ${name}
                  </h4>
                  <p class="text-sm text-slate-400 flex items-center gap-2">
                    <i class="fas fa-building text-xs"></i>
                    ${launch_service_provider.name}
                  </p>
                </div>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                    <span class="text-slate-300">${formattedDate}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">${formattedTime} UTC</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                    <span class="text-slate-300">${rocket.configuration.name} </span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1">${pad.location.name}</span>
                  </div>
                </div>
                <div
                  class="flex items-center gap-2 pt-4 border-t border-slate-700"
                >
                  <button
                    class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                  >
                    Details
                  </button>
                  <button
                    class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <i class="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
  
  `;
  }
  launchesGrid.innerHTML = box;
}
const planetsUrl = "https://solar-system-opendata-proxy.vercel.app/api/planets";
// const planetCards = document.querySelectorAll("planet-card");
const planetsGrid = document.getElementById("planets-grid");
const planetsComparison = document.getElementById("planet-comparison-tbody");

let planets = [];
async function renderPlanets() {
  const data = await getApiData(planetsUrl);
  planets = data.bodies;
  console.log(planets);

  loadPlanetDetails(0);
  let box = "";
  let comparison = "";
  for (let i = 0; i < planets.length; i++) {
    let planet = planets[i];
    let distanceAU = (planet.semimajorAxis / 149597870.7).toFixed(2);
    box += `
<div onclick="loadPlanetDetails(${i})"
              class="planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group"
              data-planet-id="${planet.englishName}"
              style="--planet-color: ${getPlanetColors(planet.englishName)}"
              onmouseover="this.style.borderColor='${getPlanetHoverColor(planet.englishName)}'"
              onmouseout="this.style.borderColor='#334155'"
            >
              <div class="relative mb-3 h-24 flex items-center justify-center">
                <img
                  class="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
                  src="${planet.image}"
                  alt="${planet.englishName}"
                />
              </div>
              <h4 class="font-semibold text-center text-sm">${planet.englishName}</h4>
              <p class="text-xs text-slate-400 text-center">${distanceAU} AU</p>
            </div>`;

    comparison += `
 <tr class="hover:bg-slate-800/30 transition-colors">
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 sticky left-0 bg-slate-800 z-10"
                      >
                        <div class="flex items-center space-x-2 md:space-x-3">
                          <div
                            class="w-6 h-6 md:w-8 md:h-8 rounded-full flex-shrink-0"
                            style="background-color:  ${getPlanetColors(planet.englishName)}"
                          ></div>
                          <span
                            class="font-semibold text-sm md:text-base whitespace-nowrap"
                            >${planet.englishName}</span
                          >
                        </div>
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                       ${distanceAU}
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        ${planet.meanRadius * 2}
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        ${(
                          (planet.mass.massValue *
                            Math.pow(10, planet.mass.massExponent)) /
                          (5.9722 * Math.pow(10, 24))
                        ).toFixed(3)} 
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                         ${(planet.sideralOrbit / 365).toFixed(1)} years
                      </td>
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        ${planet.moons?.length ?? 0}
                      </td>
                      <td class="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <span
                          class="px-2 py-1 rounded text-xs bg-orange-500/50 text-orange-200"
                          >${planet.type} </span
                        >
                      </td>
                    </tr>

`;
  }
  planetsComparison.innerHTML = comparison;
  planetsGrid.innerHTML = box;
}

function getPlanetColors(planetNm) {
  switch (planetNm.toLowerCase()) {
    case "mercury":
      return "#eab308";

    case "venus":
      return "#f97316";

    case "earth":
      return "#3b82f6";

    case "mars":
      return "#ef4444";

    case "jupiter":
      return "#fb923c";

    case "saturn":
      return "#facc15";

    case "uranus":
      return "#06b6d4";

    case "neptune":
      return "#2563eb";

    default:
      return "#334155";
  }
}
function getPlanetHoverColor(planetNm) {
  switch (planetNm.toLowerCase()) {
    case "mercury":
      return "#eab30880";

    case "venus":
      return "#f9731680";

    case "earth":
      return "#3b82f680";

    case "mars":
      return "#ef444480";

    case "jupiter":
      return "#fb923c80";

    case "saturn":
      return "#facc1580";

    case "uranus":
      return "#06b6d480";

    case "neptune":
      return "#2563eb80";

    default:
      return "#334155";
  }
}

const planetImg = document.getElementById("planet-detail-image");
const planetName = document.getElementById("planet-detail-name");
const planetDesc = document.getElementById("planet-detail-description");
const planetDistance = document.getElementById("planet-distance");
const planetRaduis = document.getElementById("planet-radius");
const planetMass = document.getElementById("planet-mass");
const planetDensity = document.getElementById("planet-density");
const planetOrbit = document.getElementById("planet-orbital-period");
const planetRotation = document.getElementById("planet-rotation");
const planetMoons = document.getElementById("planet-moons");
const planetGravity = document.getElementById("planet-gravity");
const planetDiscover = document.getElementById("planet-discoverer");
const planetDiscoverDate = document.getElementById("planet-discovery-date");
const planetType = document.getElementById("planet-body-type");
const planetVolum = document.getElementById("planet-volume");
const planetFacts = document.getElementById("planet-facts");
const planetPeri = document.getElementById("planet-perihelion");
const planetAphe = document.getElementById("planet-aphelion");
const planetEcc = document.getElementById("planet-eccentricity");
const planetIncl = document.getElementById("planet-inclination");
const planetAxial = document.getElementById("planet-axial-tilt");
const planetTemp = document.getElementById("planet-temp");
const planetEscap = document.getElementById("planet-escape");

function loadPlanetDetails(index) {
  let planet = planets[index];

  planetImg.src = planet.image;
  planetImg.alt = planet.englishName;

  planetName.textContent = planet.englishName;
  planetDesc.textContent = planet.description;

  planetDistance.textContent =
    (planet.semimajorAxis / 1000000).toFixed(1) + "M km";

  planetRaduis.textContent = planet.meanRadius + " km";

  planetMass.textContent =
    planet.mass.massValue + " x 10^" + planet.mass.massExponent + " kg";

  planetDensity.textContent = planet.density + " g/cm³";

  planetOrbit.textContent = planet.sideralOrbit + " days";

  planetRotation.textContent = planet.sideralRotation + " hours";

  planetMoons.textContent = planet.moons.length;

  planetGravity.textContent = planet.gravity + " m/s²";

  planetDiscover.textContent = planet.discoveredBy ?? "Known since antiquity";
  planetDiscoverDate.textContent = planet.discoveryDate ?? "Ancient times";
  planetType.textContent = planet.bodyType;

  planetVolum.textContent =
    planet.vol.volValue + " x 10^" + planet.vol.volExponent + " km³";

  planetPeri.textContent = (planet.perihelion / 1000000).toFixed(2) + "M km";

  planetAphe.textContent = (planet.aphelion / 1000000).toFixed(2) + "M km";

  planetEcc.textContent = planet.eccentricity;
  planetIncl.textContent = planet.inclination + "°";
  planetAxial.textContent = planet.axialTilt + "°";

  planetTemp.textContent = (planet.avgTemp - 273.15).toFixed(1) + "°C";

  planetEscap.textContent = (planet.escape / 1000).toFixed(2) + " km/s";

  let planetFactsInner = `
<li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Mass: ${planetMass.textContent} </span
                    >
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Surface gravity: ${planetGravity.textContent}</span
                    >
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Density: ${planetDensity.textContent}</span
                    >
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Axial tilt: ${planetAxial.textContent}</span
                    >
                  </li>
`;
  planetFacts.innerHTML = planetFactsInner;
}

renderApdData();
renderLaunches();
renderPlanets();
