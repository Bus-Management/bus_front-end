import { toast } from 'react-toastify'

const handleUploadImage = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'bus_management')

  try {
    const response = await fetch('https://api.cloudinary.com/v1_1/datdev/image/upload', {
      method: 'POST',
      body: formData
    })

    const data = await response.json()
    return data.secure_url
  } catch (error) {
    toast.error('Upload failed')
  }
}

export default handleUploadImage
