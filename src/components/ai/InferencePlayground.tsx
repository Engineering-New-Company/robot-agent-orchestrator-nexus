
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Upload, 
  Download, 
  Settings, 
  Zap, 
  Brain, 
  Eye, 
  MessageSquare,
  Mic,
  Image as ImageIcon,
  FileText,
  Loader2
} from "lucide-react";
import { huggingFaceService } from '@/services/huggingface';
import { toast } from "@/components/ui/use-toast";

const InferencePlayground = () => {
  const [selectedModel, setSelectedModel] = useState('');
  const [inputText, setInputText] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [inferenceType, setInferenceType] = useState('text');

  const modelSuggestions = {
    text: [
      'gpt2',
      'distilbert-base-uncased-finetuned-sst-2-english',
      'facebook/bart-large-cnn',
      'Helsinki-NLP/opus-mt-en-fr'
    ],
    image: [
      'google/vit-base-patch16-224',
      'facebook/detr-resnet-50',
      'runwayml/stable-diffusion-v1-5',
      'Salesforce/blip-image-captioning-base'
    ],
    audio: [
      'facebook/wav2vec2-base-960h',
      'openai/whisper-tiny.en',
      'MIT/ast-finetuned-audioset-10-10-0.4593'
    ]
  };

  const handleTextInference = useCallback(async () => {
    if (!selectedModel || !inputText) {
      toast({
        title: "Missing inputs",
        description: "Please select a model and enter text",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      let result;
      
      // Determine inference type based on model
      if (selectedModel.includes('sst-2') || selectedModel.includes('sentiment')) {
        result = await huggingFaceService.runSentimentAnalysis(selectedModel, inputText);
      } else if (selectedModel.includes('bart') || selectedModel.includes('summarization')) {
        result = await huggingFaceService.runTextGeneration(selectedModel, inputText, { max_length: 150 });
      } else if (selectedModel.includes('translation') || selectedModel.includes('opus-mt')) {
        result = await huggingFaceService.runTranslation(selectedModel, inputText);
      } else {
        result = await huggingFaceService.runTextGeneration(selectedModel, inputText);
      }
      
      setResults(result);
      toast({
        title: "Inference completed",
        description: "Results are ready!"
      });
    } catch (error) {
      console.error('Inference failed:', error);
      toast({
        title: "Inference failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [selectedModel, inputText]);

  const handleImageInference = useCallback(async () => {
    if (!selectedModel || !imageFile) {
      toast({
        title: "Missing inputs",
        description: "Please select a model and upload an image",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      let result;
      
      if (selectedModel.includes('vit') || selectedModel.includes('classification')) {
        result = await huggingFaceService.runImageClassification(selectedModel, imageFile);
      } else if (selectedModel.includes('detr') || selectedModel.includes('detection')) {
        result = await huggingFaceService.runObjectDetection(selectedModel, imageFile);
      } else if (selectedModel.includes('blip') || selectedModel.includes('captioning')) {
        result = await huggingFaceService.runImageToText(selectedModel, imageFile);
      } else {
        result = await huggingFaceService.runImageClassification(selectedModel, imageFile);
      }
      
      setResults(result);
      toast({
        title: "Image inference completed",
        description: "Results are ready!"
      });
    } catch (error) {
      console.error('Image inference failed:', error);
      toast({
        title: "Image inference failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [selectedModel, imageFile]);

  const handleAudioInference = useCallback(async () => {
    if (!selectedModel || !audioFile) {
      toast({
        title: "Missing inputs",
        description: "Please select a model and upload an audio file",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      let result;
      
      if (selectedModel.includes('whisper') || selectedModel.includes('speech')) {
        result = await huggingFaceService.runSpeechRecognition(selectedModel, audioFile);
      } else {
        result = await huggingFaceService.runAudioClassification(selectedModel, audioFile);
      }
      
      setResults(result);
      toast({
        title: "Audio inference completed",
        description: "Results are ready!"
      });
    } catch (error) {
      console.error('Audio inference failed:', error);
      toast({
        title: "Audio inference failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [selectedModel, audioFile]);

  const renderResults = () => {
    if (!results) return null;

    if (results.error) {
      return (
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <p className="text-red-700 font-medium">Error: {results.error}</p>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="bg-slate-50">
        <CardHeader>
          <CardTitle className="text-sm">Inference Results</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-slate-100 p-4 rounded-lg text-sm overflow-auto max-h-96">
            {JSON.stringify(results.outputs || results, null, 2)}
          </pre>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-orange-400" />
            <span>AI Inference Playground</span>
          </CardTitle>
          <CardDescription>
            Test AI models with real-time inference capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={inferenceType} onValueChange={setInferenceType} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-slate-700">
              <TabsTrigger value="text" className="data-[state=active]:bg-orange-600">
                <MessageSquare className="w-4 h-4 mr-2" />
                Text
              </TabsTrigger>
              <TabsTrigger value="image" className="data-[state=active]:bg-orange-600">
                <Eye className="w-4 h-4 mr-2" />
                Image
              </TabsTrigger>
              <TabsTrigger value="audio" className="data-[state=active]:bg-orange-600">
                <Mic className="w-4 h-4 mr-2" />
                Audio
              </TabsTrigger>
            </TabsList>

            {/* Text Inference */}
            <TabsContent value="text" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Model Selection
                  </label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue placeholder="Select a text model" />
                    </SelectTrigger>
                    <SelectContent>
                      {modelSuggestions.text.map((model) => (
                        <SelectItem key={model} value={model}>{model}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Input Text
                  </label>
                  <Textarea
                    placeholder="Enter text for inference..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="bg-slate-700 border-slate-600 min-h-[100px]"
                  />
                </div>

                <Button 
                  onClick={handleTextInference}
                  disabled={isLoading || !selectedModel || !inputText}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Run Inference
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>

            {/* Image Inference */}
            <TabsContent value="image" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Model Selection
                  </label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue placeholder="Select an image model" />
                    </SelectTrigger>
                    <SelectContent>
                      {modelSuggestions.image.map((model) => (
                        <SelectItem key={model} value={model}>{model}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Upload Image
                  </label>
                  <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <ImageIcon className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-400">Click to upload image</p>
                      {imageFile && (
                        <p className="text-green-400 mt-2">{imageFile.name}</p>
                      )}
                    </label>
                  </div>
                </div>

                <Button 
                  onClick={handleImageInference}
                  disabled={isLoading || !selectedModel || !imageFile}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Run Inference
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>

            {/* Audio Inference */}
            <TabsContent value="audio" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Model Selection
                  </label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue placeholder="Select an audio model" />
                    </SelectTrigger>
                    <SelectContent>
                      {modelSuggestions.audio.map((model) => (
                        <SelectItem key={model} value={model}>{model}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Upload Audio
                  </label>
                  <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                      className="hidden"
                      id="audio-upload"
                    />
                    <label htmlFor="audio-upload" className="cursor-pointer">
                      <Mic className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-400">Click to upload audio</p>
                      {audioFile && (
                        <p className="text-green-400 mt-2">{audioFile.name}</p>
                      )}
                    </label>
                  </div>
                </div>

                <Button 
                  onClick={handleAudioInference}
                  disabled={isLoading || !selectedModel || !audioFile}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Run Inference
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Results Section */}
          {results && (
            <div className="mt-6">
              {renderResults()}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InferencePlayground;
