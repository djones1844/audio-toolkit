#!/bin/bash
#

# Replace a section with a new file
  # This is done by spliting the original file and merging with the new fragment

# $1 inputFile: The file name of the source audio, with extension.
# $2 fragFile: The fragment to be inserted
# $3 outputFile: The filename for the audio before the split position.
# $4 fromPos: The position at which the source file should be split.
# $5 toPos: The position at which the source file should be split.

ext="${1##*.}"

# copy the first part to split1 and second to split2
ffmpeg -i "/data/$1" -acodec copy -t $4 -ss 00:00:00 "/data/split1.$ext"
ffmpeg -i "/data/$1" -acodec copy -ss $5 "/data/split2.$ext"

# create concatlist:  split1 + fragFile + split2
echo -e "file /data/split1.$ext\nfile /data/$2\nfile /data/split2.$ext" > "/data/concatlist.txt"

# merge together
ffmpeg -f concat -safe 0 -i "/data/concatlist.txt" -c copy "/data/$3"



# mark this task complete
touch "/data/taskcomplete.marker"
