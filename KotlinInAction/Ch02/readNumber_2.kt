fun readNumber(reader: BufferedReader) {
  val number = try { 
    Integer.parseInt(reader.readLine()) //이 식의 값이 try 식의 값이 된다.
  } catch (e: NumberFormatException) {
    return
  }
  println(number)
}
