export const blastFieldGroups = [
  {
    id: "general",
    title: "General",
    fields: ["blastCode", "ubicacion", "date", "period"],
  },
  {
    id: "topography",
    title: "Topografia",
    fields: ["blastArea", "seamArea", "sterileArea"],
  },
  {
    id: "holesDesignReal",
    title: "Pozos / Diseno / Real",
    fields: [
      "designHoles",
      "realHoles",
      "designBurden",
      "designSpacing",
      "designAreaPerHole",
      "realAreaPerHole",
      "holeAreaDifference",
      "blastAreaDifference",
    ],
  },
  {
    id: "lengthsMeters",
    title: "Longitudes / Metros",
    fields: [
      "designAverageLength",
      "realAverageLength",
      "averageLengthDifference",
      "totalDesignDrilledMeters",
      "totalRealDrilledMeters",
      "drilledMetersDifference",
    ],
  },
  {
    id: "aycVolumes",
    title: "Volumenes A&C",
    fields: [
      "designBlastVolumeWithoutSeams",
      "realBlastVolumeWithoutSeams",
      "designEmulsion",
    ],
  },
  {
    id: "designMaterials",
    title: "Materiales Diseno",
    fields: ["p337", "ikon15m", "realEmulsion"],
  },
  {
    id: "omc",
    title: "OMC",
    fields: [
      "omcAverageLength",
      "aycOmcDifference",
      "omcSterileCubicMeters",
      "omcCoalCubicMeters",
      "omcTotalCubicMeters",
      "omcSterileChargeFactor",
      "omcAycTotalVolumeDifference",
    ],
  },
  {
    id: "chargeFactors",
    title: "Factores de Carga",
    fields: ["opitBlastChargeFactor", "realAycChargeFactor"],
  },
  {
    id: "localControl",
    title: "Control Local",
    fields: ["lastSyncedAt", "closedAt", "notes", "createdAt", "updatedAt"],
  },
];
