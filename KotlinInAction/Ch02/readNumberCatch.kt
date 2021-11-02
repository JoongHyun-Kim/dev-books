fun readNumber(reader: BufferedReader) {
  val number = try {
    Integer.parseInt(reader.readLine()) //예외가 발생하지 않으면 이 값 사용
  } catch (e: NumberFormatException) {
    null //예외 발생 시 null 반환
  }
  println(number)
}
