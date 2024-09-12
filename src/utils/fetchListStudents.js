import userAPI from '~/api/userAPI'

const fetchListStudents = async (data) => {
  try {
    const results = []
    await Promise.all(
      data.students?.map(async (item) => {
        const res = await userAPI.getDetailUser(item.student_id)
        results.push(res)
      })
    )
    return results
  } catch (error) {
    console.log(error)
  }
}

export default fetchListStudents
