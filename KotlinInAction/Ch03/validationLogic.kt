class User(val id: Int, val name: String, val adrress: String)

fun User.validateBeforeSave() {
    fun validate(value: String, fieldName: String) { 
        if (value.isEmpty()) {
            throw IllegalArgumentException(
                "Can't save user $id: empty $fieldName") //User의 프로퍼티 직접 사용 가능
        }
    }
    validate(name, "Name") 
    validate(address, "Address")
}
fun saveUser(user: User) {
    user.validateBeforeSave() //확장 함수 호출
        
    //user를 데이터베이스에 저장
}
