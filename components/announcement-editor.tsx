"use client";
import { useState } from "react";
import EditableText from "./editable-text";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { RefreshCw, CheckCircle, Send } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { createMemorialRecord } from "@/services/airtable";

export default function AnnouncementEditor() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedText, setSubmittedText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      const announcementContent = document.getElementById(
        "announcement-content"
      );
      if (!announcementContent) {
        throw new Error("Could not find announcement content");
      }

      // Collect user-entered texts with their keys
      const editableElements = announcementContent.querySelectorAll(
        "[data-editable-text]"
      );
      const editableTexts = Array.from(editableElements).map((element) => {
        const text = element.textContent?.trim() || "";
        const key = element.getAttribute("data-key") || "";
        return { key, text };
      });

      const memberName =
        editableTexts.find((item) => item.key === "memberName")?.text || "";
      const finalText = announcementContent.innerText.trim();

      if (!finalText) {
        throw new Error("L'annonce ne peut pas être vide");
      }

      // Create Airtable record
      await createMemorialRecord({
        memberName,
        description: finalText,
      });

      setSubmittedText(finalText);
      setError(null);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir réinitialiser le formulaire ? Toutes vos modifications seront perdues."
      )
    ) {
      window.location.reload();
    }
  };

  return (
    <Card className="border-0 print:shadow-none overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 pb-4 print:hidden border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium text-gray-800 tracking-tight">
            Annonce de deuil
          </h2>
          {!isSubmitted && (
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs text-gray-600">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              Mode édition
            </div>
          )}
        </div>
        {!isSubmitted && (
          <p className="text-sm text-gray-500 mt-2 italic">
            Cliquez sur le texte en surbrillance pour le modifier
          </p>
        )}
      </CardHeader>

      {isSubmitted && (
        <div className="px-6 pt-6">
          <Alert className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-800 animate-in fade-in slide-in-from-top-5 duration-500 shadow-sm">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-800 font-medium text-base">
              Soumission réussie
            </AlertTitle>
            <AlertDescription className="text-green-700">
              Votre annonce de deuil a été soumise avec succès. Vous ne pouvez
              plus modifier le texte.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {error && (
        <div className="px-6 pt-6">
          <Alert className="bg-gradient-to-r from-red-50 to-rose-50 border-red-200 text-red-800">
            <AlertTitle className="text-red-800 font-medium text-base">
              Erreur
            </AlertTitle>
            <AlertDescription className="text-red-700">
              {error}
            </AlertDescription>
          </Alert>
        </div>
      )}

      <CardContent
        className={`p-8 space-y-6 ${isSubmitted ? "opacity-90" : ""}`}
        id="announcement-content"
      >
        <div className="prose prose-gray max-w-none">
          <div className="text-center mb-6">
            <div className="inline-block">
              <h3 className="text-lg font-serif mb-1">
                Communauté Bamiléké du Cameroun
              </h3>
              <div className="flex items-center justify-center space-x-3">
                <div className="h-px bg-gray-300 w-12"></div>
                <span className="text-xs uppercase tracking-wider text-gray-500">
                  COBACAM
                </span>
                <div className="h-px bg-gray-300 w-12"></div>
              </div>
            </div>
          </div>

          <p className="leading-relaxed">
            C'est avec une profonde tristesse que la Communauté Bamiléké du
            Cameroun (COBACAM) annonce le décès de{" "}
            <EditableText
              defaultText="La matriache"
              isDisabled={isSubmitted}
              keyName="honorific"
              data-editable-text
            />{" "}
            <EditableText
              defaultText="Marie Nguetcho"
              isDisabled={isSubmitted}
              keyName="deceasedName"
              data-editable-text
            />
            ,{" "}
            <EditableText
              defaultText="Mère"
              isDisabled={isSubmitted}
              keyName="relation"
              data-editable-text
            />{" "}
            de notre membre{" "}
            <EditableText
              defaultText="Jean-Pierre Kamdem"
              isDisabled={isSubmitted}
              keyName="memberName"
              data-editable-text
            />{" "}
            et{" "}
            <EditableText
              defaultText="belle-mère"
              isDisabled={isSubmitted}
              keyName="spouseRelation"
              data-editable-text
            />{" "}
            de{" "}
            <EditableText
              defaultText="Sylvie Kamdem"
              isDisabled={isSubmitted}
              keyName="spouseName"
              data-editable-text
            />
            . Affectueusement connue sous le nom de{" "}
            <EditableText
              defaultText="Maman Marie"
              isDisabled={isSubmitted}
              keyName="nickname"
              data-editable-text
            />
            ,{" "}
            <EditableText
              defaultText="elle"
              isDisabled={isSubmitted}
              keyName="pronoun"
              data-editable-text
            />{" "}
            s'est{" "}
            <EditableText
              defaultText="éteinte"
              isDisabled={isSubmitted}
              keyName="passedVerb"
              data-editable-text
            />{" "}
            le{" "}
            <EditableText
              defaultText="12 février 2025 au Centre Hospitalier de Montréal, après un combat contre la maladie"
              isDisabled={isSubmitted}
              keyName="deathDetails"
              data-editable-text
            />
            .
          </p>

          <Separator className="my-6" />

          <p className="font-medium">
            Les visites à domicile se tiendront à l'adresse suivante :
          </p>
          <p className="pl-4 border-l-2 border-gray-200 ml-2 italic">
            <EditableText
              defaultText="123 Avenue des Érables, Montréal, QC, H2L 2K4, Canada"
              isDisabled={isSubmitted}
              keyName="address"
              className="block"
              data-editable-text
            />
          </p>

          <p className="font-medium mt-4">Les visites sont prévues :</p>
          <p className="pl-4 border-l-2 border-gray-200 ml-2 italic">
            <EditableText
              defaultText="Les vendredis de 18h00 à 22h00, jusqu'au 15 mars"
              isDisabled={isSubmitted}
              keyName="visitingHours"
              className="block"
              data-editable-text
            />
          </p>

          <Separator className="my-6" />

          <p className="font-medium">
            Pour ceux qui souhaitent exprimer leurs condoléances par téléphone,
            vous pouvez contacter :
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            <div className="flex items-center p-3 rounded-lg bg-gray-50">
              <div className="mr-3 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div>
                <div className="text-sm font-medium">
                  <EditableText
                    defaultText="Jean-Pierre"
                    isDisabled={isSubmitted}
                    keyName="contact1Name"
                    data-editable-text
                  />
                </div>
                <div className="text-sm text-gray-600">
                  <EditableText
                    defaultText="514 555 1234"
                    isDisabled={isSubmitted}
                    keyName="contact1Phone"
                    data-editable-text
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center p-3 rounded-lg bg-gray-50">
              <div className="mr-3 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div>
                <div className="text-sm font-medium">
                  <EditableText
                    defaultText="Sylvie"
                    isDisabled={isSubmitted}
                    keyName="contact2Name"
                    data-editable-text
                  />
                </div>
                <div className="text-sm text-gray-600">
                  <EditableText
                    defaultText="514 555 5678"
                    isDisabled={isSubmitted}
                    keyName="contact2Phone"
                    data-editable-text
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-gradient-to-r from-gray-50 to-gray-100 border-t p-6 print:hidden">
        <div className="w-full flex justify-between items-center">
          {!isSubmitted ? (
            <>
              <Button
                variant="outline"
                size="default"
                onClick={handleReset}
                className="text-gray-600 border-gray-300 hover:bg-gray-100 transition-all duration-200"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Réinitialiser
              </Button>
              <Button
                variant="default"
                size="default"
                onClick={handleSubmit}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Send className="h-4 w-4 mr-2" />
                Soumettre
              </Button>
            </>
          ) : (
            <div className="w-full flex justify-center">
              <Button
                variant="outline"
                size="default"
                onClick={handleReset}
                className="text-gray-600 border-gray-300 hover:bg-gray-100 transition-all duration-200"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Créer une nouvelle annonce
              </Button>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
