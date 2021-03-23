import sharp from "sharp";

export interface ImageMetadata {
  width: number;
  height: number;
  format: string;
}

export async function getImageMetadata(
  imagePath: string
): Promise<ImageMetadata> {
  return await sharp(imagePath)
    .metadata()
    .then((m) => {
      return {
        width: m.width || 0,
        height: m.height || 0,
        format: m.format || "",
      };
    });
}
