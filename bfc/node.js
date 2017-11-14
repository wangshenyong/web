
function assertk() {
	assert.doesNotThrow(
		()={
			throw new TypeError("错无类型");
		},
		TypeErro,"错误提示"
		);
}
assertk();