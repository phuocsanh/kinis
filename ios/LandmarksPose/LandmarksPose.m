#import <VisionCamera/FrameProcessorPlugin.h>
#import <VisionCamera/FrameProcessorPluginRegistry.h>

#if __has_include("kinis/kinis-Swift.h")
#import "kinis/kinis-Swift.h"
#else
#import "kinis-Swift.h"
#endif

VISION_EXPORT_SWIFT_FRAME_PROCESSOR(LandmarksPosePlugin, LandmarksPose)