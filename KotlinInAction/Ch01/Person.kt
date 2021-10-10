data class Person(val name: String,
                  val age: Int ?= null)

fun main(args: Array<String>) { //최상위 함수
  val persons = listOf(Person("영희"),
                       Person("철수", age = 29))
  val oldest = persons.maxByOrNull { it.age ?: 0 } //람다식과 엘비스 연산자
  println("나이가 가장 많은 사람: $oldest")
} 

//결과)
//나이가 가장 많은 사람: Person(name=철수, age=29) 
