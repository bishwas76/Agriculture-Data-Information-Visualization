import { Fill, Stroke, Style, Text } from "ol/style";

export const getMaxValue = (data: any[], to_compare_key: string): number => {
  if (!data || data.length === 0) {
    console.warn("Warning: Data is empty. Returning default max value.");
    return 1;
  }
  return Math.max(...data.map((item) => Number(item[to_compare_key]) || 0));
};

export const accordingToDataStyleSetter = (
  feature: any,
  data: any[],
  to_compare_key: string
) => {
  const maxValue = getMaxValue(data, to_compare_key);
  const currentValue = feature.values_[to_compare_key] ?? 0;
  const ratio = maxValue > 0 ? currentValue / maxValue : 0;
  console.log("ratio is", ratio);

  const normalizedRatio = Math.min(Math.max(ratio, 0), 1);

  // Compute color values
  const r = Math.round(255 - (255 - 46) * normalizedRatio);
  const g = Math.round(255 - (255 - 175) * normalizedRatio);
  const b = Math.round(255 - (255 - 29) * normalizedRatio);

  const color = `rgba(${r}, ${g}, ${b}, 0.8)`;
  //   const res = "rgbrgba(46, 175, 29, 0.8)

  console.log(
    `Feature: ${feature}, Value: ${currentValue}, Max: ${maxValue}, Ratio: ${normalizedRatio}, Color: ${color}`
  );

  return new Style({
    fill: new Fill({ color }),
    stroke: new Stroke({ color: "black", width: 3, lineDash: [4] }),
    text: new Text({
      text: `${currentValue} metric tons`,
      fill: new Fill({ color: "black" }),
      stroke: new Stroke({ color: "white", width: 0 }),
      font: "bold 14px sans-serif",
      offsetY: -10, // Make text more visible
    }),
  });
};
