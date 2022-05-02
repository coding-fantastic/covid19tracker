export const sortData = (data) => {
    const sortedData = [...data]

    sortedData.sort((a, b) => {
        if (a.cases > b.cases){
            return false
        } else {
            return true
        }
    }  )
    return sortedData;
}