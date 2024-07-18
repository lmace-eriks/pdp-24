import { ProductSpecification } from "vtex.product-context/react/ProductTypes";
import { stringTriggers } from "./PDP24";

export type PointObject = {
  label: string;
  sublabel?: string;
  sortPriority?: number; // Sort order. Lower numbers are higher priority. Zero is invalid. Decimals are valid.
  info?: MoreInfoObject;
  value?: string; // Loaded from useProduct() hook.
};

export type MoreInfoObject = {
  title?: string;
  text?: string;
  image?: string;
  roadText?: string;
  mountainText?: string;
  electricText?: string;
  recText?: string;
  specialtyText?: string;
};

export type DataPoints = {
  // Snowboard
  ProductData_AllStyle_SB?: PointObject;
  ProductData_WinBaseTech_SB?: PointObject;
  ProductData_WinBaseType_SB?: PointObject;
  ProductData_WinCore_SB?: PointObject;
  ProductData_WinFlex_SB?: PointObject;
  ProductData_Gender_SB?: PointObject;
  ProductData_WinMounting_SB?: PointObject;
  ProductData_WinProfile_SB?: PointObject;
  ProductData_WinRiderLvl_SB?: PointObject;
  ProductData_WinStance_SB?: PointObject;
  ProductData_WinShape_SB?: PointObject;

  // Ski
  ProductData_AllStyle_SK?: PointObject;
  ProductData_WinBindings_SK?: PointObject;
  ProductData_WinCore_SK?: PointObject;
  ProductData_WinFlex_SK?: PointObject;
  ProductData_WinGeo_SK?: PointObject;
  ProductData_WinProfile_SK?: PointObject;
  ProductData_WinRiderLvl_SK?: PointObject;
  ProductData_WinTailType_SK?: PointObject;
  ProductData_WinTurnRadius_SK?: PointObject;
  ProductData_WinWaistWidth_SK?: PointObject;
  ProductData_Gender_SK?: PointObject;

  // Bike
  ProductData_BikeEbikeBattery?: PointObject;
  ProductData_BikeAllMaterial?: PointObject;
  ProductData_BikeAllWhlSize?: PointObject;
  ProductData_BikeEbikeTopSpeed?: PointObject;
  ProductData_BikeEbikeRange?: PointObject;
  ProductData_BikeEbikeMotorWatt?: PointObject;
  ProductData_BikeAllElecShift?: PointObject;
  ProductData_BikeAllNumberOfGears?: PointObject;
  ProductData_BikeEbikeClass?: PointObject;
  ProductData_BikeEbikeThrottle?: PointObject;
  ProductData_BikeRecIntendedUse?: PointObject;
  ProductData_BikeRecSpecIntendedSurface?: PointObject;
  ProductData_BikeMtbIntendedUse?: PointObject;
  ProductData_BikeMtbFrontSusp?: PointObject;
  ProductData_BikeMtbRearSusp?: PointObject;
  ProductData_BikeSpecEAssist?: PointObject;
  ProductData_BikeSpecType?: PointObject;
  ProductData_BikeRoadIntendedUse?: PointObject;
  ProductData_BikeRoadTireSize?: PointObject;

  // I am unsure if we are using the below datapoints - LM 05/22/2024
  ProductData_AllStyle_Bike?: PointObject;
  ProductData_BikeBestUse?: PointObject;
  ProductData_BikeMaterial?: PointObject;
  ProductData_BikeWhlSize?: PointObject;
  ProductData_BikeCasGears?: PointObject;
  ProductData_BikeChainrings?: PointObject;
  ProductData_BikeHandlebar?: PointObject;
};

export const bikeDetailsMap = () => {
  const bdMap = new Map<string, PointObject>();

  bdMap.set("ProductData_AllStyle_Bike", {
    label: "Intended Use",
    sortPriority: 1,
    info: {
      text:
        "<ul data-lm-list><li data-lm-list-item><b>Comfort</b> - Made for leisurely rides, generally on paved surfaces or hard packed dirt.</li><li data-lm-list-item><b>Fitness</b> - Even with a motor one can still experience a rewarding fitness ride, that's what these bikes are all about!</li><li data-lm-list-item><b>Mountain</b> - eMountain bikes are made to do exactly what an analog mountain bike does but allowing longer rides and assist on climbs, if desired!</li><li data-lm-list-item><b>Road</b> - eRoad bikes are efficient and fast, allowing longer rides than with an analog road bike.</li></ul>",
    },
  })

  bdMap.set("ProductData_BikeAllMaterial", {
    label: "Material",
    sortPriority: 2,
    info: {
      text:
        "<ul data-lm-list><li data-lm-list-item><b>Aluminum</b> - Great for strength, reliability, and price.</li><li data-lm-list-item><b>Steel</b> - Versatility, craftsmanship, and durability for a unique riding experience.</li><li data-lm-list-item><b>Carbon Fiber</b> - The superior material for frame stiffness and weight, giving the most efficient ride.</li></ul>",
      mountainText:
        "<ul data-lm-list><li data-lm-list-item><b>Aluminum</b> - Most common mountain bike frame material. Great for strength, reliability, and price.</li><li data-lm-list-item><b>Steel</b> - Versatility, craftsmanship, and durability for a unique riding experience.</li><li data-lm-list-item><b>Carbon Fiber</b> - The superior material for frame stiffness and weight, giving the most efficient ride.</li></ul>",
    },
  })

  bdMap.set("ProductData_BikeAllWhlSize", {
    label: "Wheel Size",
    sortPriority: 2.4,
    info: {
      text: "<p data-lm-text>Different wheel sizes can give bikes a different feel, riding style, or benefit different sizes of the same bike.</p>",
      mountainText:
        "<p data-lm-text>Different wheel sizes can give bikes a different feel, riding style, or benefit different sizes of the same bike.</p><ul data-lm-list><li data-lm-list-item><b>29</b> - Largest general mountain bike wheel size. Great for speed and rolling over obstacles.</li><li data-lm-list-item><b>27.5</b> - Great for reducing weight, lowering center of gravity for better control, and/or smaller sized mountain bikes.</li><li data-lm-list-item><b>27.5/29</b> - Mixed wheel or “mullet” set ups use a 29 wheel in the front and a 27.5 in the rear. This generally gives a more playful and nimble ride while still getting the rolling benefits of a 29.</li></ul>",
      specialtyText:
        "<p data-lm-text>Wheel sizes on specialty bikes can vary greatly due to their unique uses. Each will have sizes chosen by the designer to fit the specific use case of each bike. These wheels generally range from 20” to 29”.</p>",
    },
  })

  bdMap.set("ProductData_BikeAllElecShift", {
    label: "Electronic Shifting",
    sortPriority: 10,
    info: {
      text: "",
    },
  })

  bdMap.set("ProductData_BikeAllNumberOfGears", {
    label: "Number of Gears",
    sortPriority: 10,
    info: {
      text: "<p data-lm-text>Number of cogs on the rear wheel of the bike. Generally translates to the amount of granularity while shifting.</p>",
    },
  })

  bdMap.set("ProductData_BikeEbikeBattery", {
    label: "Battery Size",
    sortPriority: 2,
    info: {
      text:
        "<p data-lm-text>Battery size is measured in Watt-Hours (Wh). A higher number means more battery capacity which, in general, will increase range!</p>",
    }
  })

  bdMap.set("ProductData_BikeEbikeTopSpeed", {
    label: "Top Speed",
    sortPriority: 2.1,
    info: {
      text:
        "<p data-lm-text>In the US, eBikes have a top motor speed of either 20mph or 28mph, depending on the model, before cutting out and relying entirely on rider input.</p>",
    },
  })

  bdMap.set("ProductData_BikeEbikeRange", {
    label: "Battery Range",
    sortPriority: 3,
    info: {
      text:
        "<p data-lm-text>The range of an eBike depends on many factors, including battery size, motor power, current assist mode, weather, terrain, and rider/cargo weight. Given all these factors, manufacturers tend to give the best possible range reading in ideal conditions like a warm day on a flat, paved surface with an “average” rider in the lowest assist mode. Actual milage may vary.</p>",
    },
  })

  bdMap.set("ProductData_BikeEbikeMotorWatt", {
    label: "Motor Power",
    sortPriority: 4,
    info: {
      text:
        "<p data-lm-text>Motor wattage is a measure of the amount of power the motor can output in normal operating conditions. This is almost always a 'nominal' or 'sustained' reading while the 'peak' output can be higher in short bursts.</p>",
    },
  })

  bdMap.set("ProductData_BikeEbikeClass", {
    label: "EBike Classification",
    sortPriority: 10,
    info: {
      text:
        "<ul data-lm-list><li data-lm-list-item><b>Class 1</b> - Pedal assist only, top speed of 20mph.</li><li data-lm-list-item><b>Class 2</b> - Pedal assist and throttle, top speed of 20mph.</li><li data-lm-list-item><b>Class 3</b> - Pedal assist only, top speed of 28mph OR pedal assist with a top speed of 28mph and a throttle with a top speed of 20mph.</li></ul>",
    },
  })

  bdMap.set("ProductData_BikeEbikeThrottle", {
    label: "Throttle Assist",
    sortPriority: 10,
    info: {
      text:
        "<ul data-lm-list><li data-lm-list-item><b>Yes</b> - Bike is equipped with a throttle.</li><li data-lm-list-item><b>No</b> - Bike is not equipped with a throttle and one cannot be added.</li><li data-lm-list-item><b>Optional Add-On</b> - Bike supports a throttle but is not equipped with one by default. A throttle can be purchased separately and added to bike.</li></ul>",
    },
  })

  bdMap.set("ProductData_BikeRoadIntendedUse", {
    label: "Intended Use",
    sortPriority: 1,
    info: {
      text:
        "<ul data-lm-list><li data-lm-list-item><b>Endurance</b> - Endurance bikes prioritize comfort and the ability to travel long distances, on pavement.</li><li data-lm-list-item><b>Performance</b> - The ultimate speed, performance, and efficiency on paved surfaces.</li><li data-lm-list-item><b>Gravel Adventure</b> - Gravel bikes include wider tires made for riding off pavement on dirt roads or other hardpack. Gravel Adventure bikes focus on comfort and longevity in the saddle. They may also include additional mounting points for bags, racks, fenders, etc.</li><li data-lm-list-item><b>Gravel Race</b> - These bikes still include wider tires than road bikes and focus on the best off-pavement performance.</li></ul>",
    },
  })

  bdMap.set("ProductData_BikeRoadTireSize", {
    label: "Tire Size",
    sortPriority: 2.5,
    info: {
      text: "<p data-lm-text>Wider tires offer greater grip and comfort. Skinnier tires have much less rolling resistance for added speed and efficiency.</p>",
    },
  })

  bdMap.set("ProductData_BikeSpecType", {
    label: "Bike Type",
    sortPriority: 1,
    info: {
      text:
        "<ul data-lm-list><li data-lm-list-item><b>Recumbent</b> - A type of bike or trike that that has a backrest and large seat. Great for people with certain leg and back problems or that want the maximum comfort!</li><li data-lm-list-item><b>Trike</b> - Trikes have two wheels connected by an axle in the rear and a normal front wheel. They often come with baskets in the rear to haul groceries, work supplies, or anything else that will fit!</li><li data-lm-list-item><b>Tandem</b> - A bicycle built for two! Tandem bicycles have two seats and two sets of pedals. The front person controls steering and shifting while both people pedal to move forward.</li></ul>",
    },
  })

  bdMap.set("ProductData_BikeSpecEAssist", {
    label: "Electric Assist",
    sortPriority: 2,
    info: {
      text:
        "<p data-lm-text>Like with traditional bikes, specialty bikes can also be augmented with a motor to assist on hills, ride farther, have more fun, or all of the above!</p>",
    },
  })

  bdMap.set("ProductData_BikeMtbIntendedUse", {
    label: "Intended Use",
    sortPriority: 2,
    info: {
      text:
        "<ul data-lm-list><li data-lm-list-item><b>Trail</b> - Trail bikes strike a great balance between travel length and gearing to give a well-rounded experience for both climbing and descending; giving a great ride at almost any trail system.</li><li data-lm-list-item><b>Cross Country (XC)</b> - XC bikes have shorter travel suspension and are more focused on speed, efficiency, and climbing.</li><li data-lm-list-item><b>Enduro</b> - Enduro bikes mainly focus on speed and control going downhill but strike a balance with pedaling efficiency as enduro races require you to pedal up under your own power. Longer travel also allows hitting of larger and more technical trail features.</li><li data-lm-list-item><b>Downhill</b> - Mountain bikes with the highest amount of travel, built for the ultimate speed and stability going downhill. Longer travel also allows hitting of larger and more technical trail features.</li></ul>",
    },
  })

  bdMap.set("ProductData_BikeMtbFrontSusp", {
    label: "Front Suspension",
    sortPriority: 2.1,
    info: {
      text: "<p data-lm-text>The distance, in millimeters, that a front suspension fork will move.</p>",
    },
  })

  bdMap.set("ProductData_BikeMtbRearSusp", {
    label: "Rear Suspension",
    sortPriority: 2.2,
    info: {
      text: "<p data-lm-text>The distance, in millimeters, that the rear wheel will move with a rear suspension set up.</p>",
    },
  })

  bdMap.set("ProductData_BikeRecSpecIntendedSurface", {
    label: "Intended Surface",
    sortPriority: 2,
    info: {
      text:
        "<ul data-lm-list><li data-lm-list-item><b>Pavement</b> - Smooth, sometimes skinnier, tires for easier rolling on paved surfaces.</li><li data-lm-list-item><b>Dirt</b> - Wider, knobbier tires, meant for taking off road or on loose dirt.</li><li data-lm-list-item><b>Gravel</b> - In between width, knobby tires that will work on pavement but excel on fire roads, packed dirt, and, of course, gravel.</li></ul>",
    },
  })

  bdMap.set("ProductData_BikeRecIntendedUse", {
    label: "Intended Use",
    sortPriority: 2,
    info: {
      text:
        "<ul data-lm-list><li data-lm-list-item><b>Comfort</b> - Made for leisurely rides, generally on paved surfaces or hard packed dirt.</li><li data-lm-list-item><b>Fitness</b> - Designed to give a comfortable ride while having a sporty geometry to get a workout in whenever is convienent!</li><li data-lm-list-item><b>Mountain</b> - Intended to explore single-track mountain bike trails and rougher off-road terrain.</li><li data-lm-list-item><b>Road</b> - Meant to give you maximum efficiency on pavement.</li></ul>",
    },
  });

  return bdMap;

}

export const snowboardDataPoints: DataPoints = {
  ProductData_AllStyle_SB: {
    label: "All Style",
    sortPriority: 1,
    info: {
      text:
        "<ul data-lm-list><li data-lm-list-item><b>All Mountain</b> - Ride anywhere on the resort.</li><li data-lm-list-item><b>Freeride</b> - All about carving and speed from groomed runs to fresh powder on the natural terrain of a mountain.</li><li data-lm-list-item><b>Freestyle</b> - Designed for riding on features from handrails, jumps, and half pipe in the terrain park to natural features and side hits on theresort.</li><li data-lm-list-item><b>Backcountry</b> - Ride in untracked and natural mountain terrain.</li><li data-lm-list-item><b>Powder</b> - Specifically shaped and designed to float in deep, fresh snow conditions.</li><li data-lm-list-item><b>Splitboard</b> - Used with specific bindings and skins to convert the snowboard into skis for hiking uphill to reach inaccessible slopes.</li></ul>",
    },
  },
  ProductData_WinBaseTech_SB: {
    label: "Base Tech",
    sortPriority: 10,
    info: {
      text:
        "<ul data-lm-list> <li data-lm-list-item><b>Extruded Base</b> - Found on most beginner and freestyle snowboards. Durable and made to be easier to repair and maintain.</li> <li data-lm-list-item> <b> Sintered Base</b> - Absorbs and holds wax better for more custom tuning resulting in faster performance but does require more frequent wax application. </li> </ul>",
    },
  },
  ProductData_WinBaseType_SB: {
    label: "Base Type",
    sortPriority: 10,
  },
  ProductData_WinCore_SB: {
    label: "Core",
    sortPriority: 10,
    info: {
      text:
        "<p data-lm-text> The material in the core of a snowboard is typically made of wood or other materials that enhance how the board rides and behaves on snow. </p>",
    },
  },
  ProductData_WinFlex_SB: {
    label: "Flex",
    sortPriority: 4,
    info: {
      text:
        "<ul data-lm-list> <li data-lm-list-item><b>Soft Flex</b> - Forgiving and easier to apply pressure to while riding.</li> <li data-lm-list-item><b>Medium Flex</b> - Versatile and responsive in varying conditions and terrain.</li> <li data-lm-list-item><b>Stiff Flex</b> - Less forgiving allowing for pressure to transfer edge to edge for a quick responsive board at high speeds.</li> </ul>",
    },
  },
  ProductData_Gender_SB: {
    label: "Gender",
    sortPriority: 10,
  },
  ProductData_WinMounting_SB: {
    label: "Mounting",
    sortPriority: 10,
    info: {
      text:
        "<p data-lm-text>The insert formation on the snowboard determines if a binding is compatible, how it is mounted, and your range of stance options.</p>",
    },
  },
  ProductData_WinProfile_SB: {
    label: "Profile",
    sortPriority: 2,
    info: {
      text:
        "<ul data-lm-list><li data-lm-list-item><b>Camber</b> - Best for carving and maintaining control and stability at speed on groomed runs or hard-pack with a lively responsive feel.</li><li data-lm-list-item><b>Rocker</b> - Designed for quick turn initiation with a loose, surfy feel ideal for freestyle riding and fresh powder runs.</li><li data-lm-list-item><b>Flat</b> - Versatile for various riding styles with balanced maneuverability and stability.</li><li data-lm-list-item><b>Hybrid</b> - Is a combination of bends in the profile of a snowboard that change the riding characteristics for different terrains and conditions.</li></ul>",
    },
  },
  ProductData_WinRiderLvl_SB: {
    label: "Rider Level",
    sortPriority: 5,
    info: {
      text:
        "<ul data-lm-list> <li data-lm-list-item><b>Beginner</b> - From a first-time rider to learning the foundations of carving and stopping.</li> <li data-lm-list-item><b>Intermmediate</b> - A rider that has mastered the basics wants to explore riding different terrain or increasing speed.</li> <li data-lm-list-item><b>Advanced/Expert</b> - An experienced rider that can ride difficult terrain in any conditions.</li> </ul>",
    },
  },
  ProductData_WinStance_SB: {
    label: "Stance",
    sortPriority: 10,
  },
  ProductData_WinShape_SB: {
    label: "Shape",
    sortPriority: 3,
    info: {
      text:
        "<ul data-lm-list><li data-lm-list-item><b>Twin</b> - The nose of the snowboard is the same shape and rise as the tail to ride the board in either direction and balanced freestyle riding.</li><li data-lm-list-item><b> Directional Twin</b> - The nose of the snowboard is the same shape and rise as the tail with the binding inserts set back for more surface area inthe nose and versatility when riding in different snow conditions and terrain.</li><li data-lm-list-item><b>Directional</b> - The nose is typically longer and/or wider than the tail for float in powder and downhill riding.</li></ul>",
    },
  },
};

export const skiDataPoints: DataPoints = {
  ProductData_AllStyle_SK: {
    label: "All Style",
    sortPriority: 1,
    info: {
      text:
        "<ul data-lm-list><li data-lm-list-item><b>All Mountain/On Piste</b> - Ride anywhere on the resort.</li><li data-lm-list-item><b>Freeride</b> - All about carving and speed from groomed runs to fresh powder on the natural terrain of a mountain.</li><li data-lm-list-item><b> Freestyle</b> - Designed for riding on features from handrails, jumps, and half pipe in the terrain park to natural features and side hits on theresort.</li><li data-lm-list-item><b>Backcountry</b> - Ride in untracked and natural mountain terrain.</li><li data-lm-list-item><b>Powder</b> - Specifically shaped and designed to carve and float in deep, fresh snow conditions.</li></ul>",
    },
  },
  ProductData_WinBindings_SK: {
    label: "Bindings",
    sortPriority: 10,
  },
  ProductData_WinCore_SK: {
    label: "Core",
    sortPriority: 10,
    info: {
      text:
        "<p data-lm-text>The materials in the cores of skis are typically made of wood or other materials that enhance how the skis ride and behave on snow.</p>",
    },
  },
  ProductData_WinFlex_SK: {
    label: "Flex",
    sortPriority: 10,
  },
  ProductData_Gender_SK: {
    label: "Gender",
    sortPriority: 10,
  },
  ProductData_WinGeo_SK: {
    label: "Dimensions",
    sublabel: "Tip / Waist / Tail",
    sortPriority: 10,
    info: {
      text:
        "<ul data-lm-list><li data-lm-list-item><b>Tip</b> - The front portion of the ski. Impacts how the skis initiates turns and handles varied snow&nbsp;conditions.</li><li data-lm-list-item><b>Waist</b> - The narrowest part of the ski and located underfoot. Waist width greatly affects the ride quality and best informs terrain performance.</li><li data-lm-list-item><b>Tail</b> - The rear end of the ski. This dimension impacts how the ski completes and exits from&nbsp;turns.</li></ul>",
    },
  },
  ProductData_WinProfile_SK: {
    label: "Profile",
    sortPriority: 2,
    info: {
      text:
        "<ul data-lm-list><li data-lm-list-item><b>Camber</b> - Best for carving and maintaining control and stability at speed on groomed runs or hard-pack with a lively responsive feel.</li><li data-lm-list-item><b>Rocker</b> - Designed for quick turn initiation with a loose, surfy feel ideal for freestyle riding and fresh powder runs.</li><li data-lm-list-item><b>Flat</b> - Versatile for various riding styles with balanced maneuverability and stability.</li><li data-lm-list-item><b>Hybrid</b> - Is a combination of bends in the profile of skis that change the riding characteristics for different terrains and conditions.</li></ul>",
    },
  },
  ProductData_WinRiderLvl_SK: {
    label: "Rider Level",
    sortPriority: 3,
    info: {
      text:
        "<ul data-lm-list><li data-lm-list-item><b>Beginner</b> - From a first-time rider to learning the foundations of carving and stopping.</li> <li data-lm-list-item><b>Intermmediate</b> - A rider that has mastered the basics wants to explore riding different terrain on the resort.</li> <li data-lm-list-item><b>Advanced/Expert</b> - An experienced rider that can ride difficult terrain in any conditions.</li></ul>",
    },
  },
  ProductData_WinTailType_SK: {
    label: "Tail Type",
    sortPriority: 10,
    info: {
      text:
        "<ul data-lm-list> <li data-lm-list-item> <b>Twin Tip</b> - Rounded shape with an early rise in the tail of the ski adapted for in the terrain park, on features, and buttering down runs. </li> <li data-lm-list-item><b>Flared</b> - A more traditional flat shape with a slight rise in the tail for grip and stability on different terrain.</li> <li data-lm-list-item><b>Flat</b> - Shaped for more control on firm snow and quick turning versatility.</li> </ul>",
    },
  },
  ProductData_WinTurnRadius_SK: {
    label: "Turn Radius",
    sortPriority: 5,
    info: {
      text:
        "<ul data-lm-list> <li data-lm-list-item><b>Short</b> - A radius of 15 meters or less designed for quick maneuverability from edge to edge.</li> <li data-lm-list-item><b>Medium</b> - A versatile all mountain radius that falls between 15-20 meters ideal for most riders.</li> <li data-lm-list-item><b>Long</b>- A radius of 20 meters or more for aggressive, big mountain riding at high speeds.</li> </ul>",
    },
  },
  ProductData_WinWaistWidth_SK: {
    label: "Waist Width",
    sortPriority: 4,
    info: {
      text:
        "<p data-lm-text> Waist width refers to how wide the ski is at the narrowest section of the ski. A wider waist width is a larger platform for floating in deep powder conditions, and a narrow waist is more agile on hardpack. </p>",
    },
  },
};

export type ImageSourceObject = {
  id: string;
  width?: number | "auto";
  height?: number | "auto";
  quality?: number;
};

// Parent list brought up to date on 05/28/2024 - LM
export const sortedAventonBikeParentIdList = ["PR3E22459", "PR3E23944", "PR3E23945", "PR3E26660", "PR3E26661", "PR5A10799", "PR5A10801", "PR5A10803", "PR5A10804", "PR5A14330", "PR5A14332", "PR5A15042", "PR5A15571", "PR5A15572", "PR5A16930", "PR5A17620", "PR5A17621", "PR5A18619", "PR5A18620", "PR5A18908", "PR5A19055", "PR5A19224", "PR5A19225", "PR5A19226", "PR5A19227", "PR5A19770", "PR5A20490", "PR5A20491", "PR5A21693", "PR5A21883", "PR5A22584", "PR5A22757", "PR5A22758", "PR5A22759", "PR5A22760", "PR5A22761"];

// Returns true if supplied ParentID is in supplied array of Parent Ids.
export const binarySearchParentId: (targetParentId: string, sortedParentList: string[], firstIndex: number, finalIndex: number) => boolean = (targetParentId: string, sortedParentList: string[], firstIndex: number, finalIndex: number) => {
  if (firstIndex > finalIndex) return false;

  targetParentId = targetParentId.toLowerCase();

  const pivotIndex = Math.floor((firstIndex + finalIndex) / 2);
  const pivotElement = sortedParentList[pivotIndex].toLowerCase();

  if (pivotElement === targetParentId) return true;

  if (pivotElement > targetParentId) {
    return binarySearchParentId(targetParentId, sortedParentList, firstIndex, pivotIndex - 1);
  } else {
    return binarySearchParentId(targetParentId, sortedParentList, pivotIndex + 1, finalIndex);
  }
}

export const binaryNumberSearch: (targetNumber: number, numberList: number[], firstIndex: number, finalIndex: number) => boolean = (targetNumber: number, numberList: number[], firstIndex: number, finalIndex: number) => {
  if (firstIndex > finalIndex) return false;

  const pivotIndex = Math.floor((firstIndex + finalIndex) / 2);
  const pivotElement = numberList[pivotIndex];

  if (pivotElement === targetNumber) return true;

  if (pivotElement > targetNumber) {
    return binaryNumberSearch(targetNumber, numberList, firstIndex, pivotIndex - 1);
  } else {
    return binaryNumberSearch(targetNumber, numberList, pivotIndex + 1, finalIndex);
  }
}

// Function takes a ProductSpecification[] from VTEX and returns a Map() with
// a DataPoint label string as the key and the value from VTEX's backend. DataPoint
// label must include the _ProductData string to be included in Map().
export const buildDataPointMap = (productProperties: ProductSpecification[]) => {
  const dataPoints: Map<string, string> = new Map();

  for (const property of productProperties) {
    if (property.name.includes(stringTriggers.productData)) {
      dataPoints.set(property.name, property.values[0]);
    }
  }

  return dataPoints;
}
