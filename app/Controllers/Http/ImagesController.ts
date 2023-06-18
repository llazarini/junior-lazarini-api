import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Image from 'App/Models/Image';
import ImageResizeProcess from 'App/Processing/ImageResizeProcess';
import StoreValidator from 'App/Validators/Images/StoreValidator'
import Drive from '@ioc:Adonis/Core/Drive';

export default class ImagesController {
    /**
     * Store
     * @param param0 
     * @returns 
     */
    public async store({ request, response }: HttpContextContract) {
        await request.validate(StoreValidator);

        const imageFile = request.file("image", {
			size: "15mb",
			extnames: ["png", "jpg", "jpeg", "PNG", "JPG", "JPEG"],
		});

		if (!imageFile?.isValid) {
			return response.badRequest({
				message: 'The image type needs to be .png, .jpg or .jpeg and needs to have less than 15mb.'
			})
		}

        const drive = 's3';

        try {
            await imageFile.moveToDisk('images', {
                visibility: 'public',
                contentType: 'application/image'
            }, drive);

            const image = new Image();
            image.merge(request.all());
            image.drive = drive;
            image.path = imageFile.fileName || "";
            image.fileType = imageFile.type || "";
            image.extension = imageFile.extname || "";
            image.size = imageFile.size || 0;
            image.requestToken = request.input('request_token') || '';
    
            if (!await image.save()) {
                return response.badRequest({
                    message: "Error when trying to save the register."
                })
            }

            return {
                message: "Success when saving the register.",
                data: image
            }
        } catch (e) {
            console.error(e)

            return response.badRequest({
				message: 'Error when trying to upload the image to S3 disk.'
			})
        }
    }

    /**
     * Retrieve an image
     * @param param0 
     */
    public async image({ request, response }: HttpContextContract) {
        const image = request.input('url');
        const width = request.input('width') === 'auto' ? null : +request.input('width');
        const height = request.input('height') === 'auto' ? null : +request.input('height');

        if (!image || !request.input('width') || !request.input('height')) {
            return response.badRequest({
                message: 'The width and height must be provided'
            })
        }
        
        const s3 = Drive.use('s3')
        const imageResizedName = `resized/${width}x${height}/${image}`;

        if (await s3.exists(imageResizedName)) {
            return response.redirect(
                await s3.getUrl(imageResizedName)
            );
        }

        const url = await ImageResizeProcess.resize(image, imageResizedName, width, height);

        if (typeof url === 'string') {
            return response.redirect(url, undefined, 301);
        }
    }

    /**
     * Retrieve an image
     * @param param0 
     */
    public async images({ request, response }: HttpContextContract) {
        const { id, imageable } = request.qs();

        if (!id || !imageable) {
            return response.badRequest({
                message: 'Imageable and the id must be provided.'
            })
        }

        const images = Image.query()
            .where('imageable', imageable)
            .where('imageable_id', id);

        return images;
    }

    public async delete({ request, response }: HttpContextContract) {
        const id = request.param('id');
        const image = await Image.find(id);

        if (!image) {
            return response.badRequest({
                message: 'Any image with this ID was found.'
            })
        }
        await image.delete();
        return {
            message: 'Image successfully removed.'
        }
    }
}
