public enum Loops {
        //dns43: added forIn for JavaScript, will always be empty in C, is that a problem?
	forLoop("for"), doWhileLoop("do"), whileLoop("while"), forInLoop("in");

	private final String name;

	private Loops(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return this.name;
	}
}