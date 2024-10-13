import userAPI from '~/api/userAPI'

const fetchListStudents = async (data) => {
  try {
    const results = []
    await Promise.all(
      data.studentIds?.map(async (item) => {
        const res = await userAPI.getDetailUser(item)
        results.push(res)
      })
    )
    return results
  } catch (error) {
    console.log(error)
  }
}

export default fetchListStudents
