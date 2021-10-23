import productImage from "../assets/images/default/product.png";

const getBase64ImageFromUrl = async (imageUrl) => {
    var res = await fetch(imageUrl);
    var blob = await res.blob();

    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.addEventListener(
            "load",
            function () {
                resolve(reader.result);
            },
            false
        );

        reader.onerror = () => {
            return reject(this);
        };
        reader.readAsDataURL(blob);
    });
};

const base64StringtoFile = (base64String, filename) => {
    if (!base64String || !filename) {
        return null
    }
    let arr = base64String.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
};

export const convertBase64Img = async (formData) => {

    const baseUrl = process.env.REACT_APP_BASE_URL;

    let files = [];
    for (let i = 0; i < formData.length; i++) {
        const file = formData[i];
        let result = await getBase64ImageFromUrl(`${baseUrl}/` + file.image);
        let bufferData = await base64StringtoFile(result, file.originalName);
        bufferData.id = file.id;
        bufferData.isDefault = file.isDefault;
        bufferData.image = file.image;
        files.push(bufferData);
    }

    return [...files.map((file) =>
        Object.assign(file, {
            preview: URL.createObjectURL(file),
        })
    )];
};

export const productImageUrl = (data) => {
    if (!data || !data.length) {
        return productImage;
    } else {
        const baseUrl = process.env.REACT_APP_BASE_URL;
        return `${baseUrl}/` + data[0].image;
    }
};
