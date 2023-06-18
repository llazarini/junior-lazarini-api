import Drive from '@ioc:Adonis/Core/Drive';
import Env from "@ioc:Adonis/Core/Env";
import sharp from "sharp";

export default class ImageResizeProcess {
	static async resize(imageName, imageResizedName, width, height) {
        const s3 = Drive.use('s3')
        const previewUrl = `${Env.get('S3_URL')}${imageResizedName}`;
        const file = await s3.get(imageName)

        try {
            const result = await new Promise((resolve, reject) => {
                sharp(file)
                    .resize(width, height)
                    .jpeg({ mozjpeg: true })
                    .toBuffer()
                    .then(async (buffer) => {
                        if (await s3.exists(imageResizedName)) {
                            await s3.delete(imageResizedName);
                        }

                        await s3.put(imageResizedName, buffer, {
                            visibility: 'public',
                            contentType: 'image/png'
                        });

                        resolve(previewUrl);
                    })
                    .catch(error => {
                        console.error(error);
                        reject(error);
                    });
            });
			return result;
        } catch (exception) {
            console.error(exception)
        }

		return null;
	}
}