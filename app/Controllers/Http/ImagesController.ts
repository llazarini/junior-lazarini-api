import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Image from 'App/Models/Image';
import StoreValidator from 'App/Validators/Images/StoreValidator'
import UpdateValidator from 'App/Validators/Images/UpdateValidator';

export default class ImagesController {
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
    
            if (!await image.save()) {
                return response.badRequest({
                    message: "Error when trying to save the register."
                })
            }

            return {
                message: "Success when saving the register."
            }
        } catch (e) {
            console.error(e)

            return response.badRequest({
				message: 'Error when trying to upload the image to S3 disk.'
			})
        }
    }
}
