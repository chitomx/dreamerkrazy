#!/bin/sh

source ./config

mkdir -p out
cd tests

function make_test {
	i=$1
	echo "aaa$i"
	cd $i
	mkdir tmp
	javac -cp $J2ME_JARS -d tmp -source 1.3 -target 1.3 -sourcepath .:.. Test.java
	cp -q *.png tmp
	cp -q *.wav tmp
	name=`echo $i | tr -d /`
	cd tmp
	jar cfm ../../../out/$name.jar ../../MANIFEST.MF *
	cd ..
	rm -rf tmp
	cd ..
}

if [ -z "$1" ]; then
	for i in */; do
		make_test $i
	done
else
	make_test $1
fi
